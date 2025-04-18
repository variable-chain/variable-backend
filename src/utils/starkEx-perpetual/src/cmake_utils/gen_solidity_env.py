#!/usr/bin/env python3

"""
A helper for solidity_rules.cmake.
Generates an EVM contract environment from python_lib targets.
"""

import json
import os
import shutil
import subprocess
from argparse import ArgumentParser
from typing import Dict, List


def find_dependency_libraries(libs: List[str], info_dir: str) -> Dict[str, dict]:
    """
    Finds all transitively closed dependency libraries for given libraries.
    Returns a dictionary from library name to the info dict generated by gen_py_lib.py.
    """
    found_libraries = {}
    library_queue = libs.copy()
    while library_queue:
        lib = library_queue.pop()
        if lib in found_libraries:
            continue
        filename = os.path.join(info_dir, f"{lib}.info")
        with open(filename, "r") as fp:
            found_libraries[lib] = json.load(fp)
        library_queue += found_libraries[lib]["lib_deps"]

    return found_libraries


def main():
    parser = ArgumentParser(description="Generates an EVM contract environment.")
    parser.add_argument(
        "--name", type=str, help="The name of the EVM contract environment", required=True
    )
    parser.add_argument("--libs", type=str, nargs="*", help="Library list", required=True)
    parser.add_argument(
        "--env_dir", help="EVM contract environment output directory", type=str, required=True
    )
    parser.add_argument(
        "--info_dir", help="Directory for all libraries info files", type=str, required=True
    )
    parser.add_argument("--solc_bin", help="Explicit solc binary", type=str, default="solc-0.6.12")
    parser.add_argument(
        "--optimize_runs", help="Optimize-runs arg to pass into solc", type=int, default=200
    )

    args = parser.parse_args()

    # Clean directories.
    shutil.rmtree(args.env_dir, ignore_errors=True)
    contracts_dir = args.env_dir
    artifacts_dir = os.path.join(args.env_dir, "artifacts")
    os.makedirs(contracts_dir)
    os.makedirs(artifacts_dir)

    # Find all libraries.
    found_libraries = find_dependency_libraries(args.libs, args.info_dir)

    # Populate project contracts directory.
    filenames = []
    for lib_name, lib_info in found_libraries.items():
        lib_dirs = lib_info["lib_dir"]
        assert len(lib_dirs) == 1, f"Library {lib_name} has {len(lib_dirs)} library directories."
        for filename in lib_info["files"]:
            src = os.path.join(lib_dirs[0], filename)
            dst = os.path.join(contracts_dir, filename)
            filenames.append(dst)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            assert not os.path.exists(dst), f"Multiple entries for {filename} in site dir."
            # Create a hardlink.
            os.link(src, dst)

    # Compile.
    subprocess.check_call(
        [
            args.solc_bin,
            "--optimize",
            "--optimize-runs",
            str(args.optimize_runs),
            "--combined-json",
            "abi,bin",
            "-o",
            "artifacts/",
            *filenames,
        ],
        cwd=args.env_dir,
    )

    git_commit = "BADB51"
    try:
        git_commit = (
            subprocess.check_output("git rev-parse HEAD".split()).decode("ascii").strip()[:6]
        )
    except:
        pass

    # Extract artifacts.
    extract_artifacts(
        artifacts_dir=artifacts_dir,
        combined_json_filename=os.path.join(artifacts_dir, "combined.json"),
        build_tag=git_commit,
    )

    # Generate info file.
    with open(os.path.join(args.info_dir, f"{args.name}.info"), "w") as fp:
        json.dump(
            {
                "env_dir": args.env_dir,
            },
            fp,
            indent=4,
        )
        fp.write("\n")


def extract_artifacts(artifacts_dir, combined_json_filename, build_tag):
    with open(combined_json_filename) as fp:
        combined_json = json.load(fp)

    for full_name, val in combined_json["contracts"].items():
        _, name = full_name.split(":")

        # 1. We cannot put "0x" in case of empty bin, as this would not prevent
        #    loading an empty (virtual) contract. (We want it to fail)
        # 2. Note that we can't put an assert len(val['bin']) > 0 here, because some contracts
        #    are pure virtual and others lack external and public functions.
        bytecode = None
        if len(val["bin"]) > 0:
            bytecode = "0x" + val["bin"]

        # Support both solc-0.6 & solc-0.8 output format.
        # In solc-0.6 the abi is a list in a json string,
        # whereas in 0.8 it's a plain json.
        try:
            abi = json.loads(val["abi"])
        except TypeError:
            abi = val["abi"]

        artifact = {
            "contractName": name,
            "abi": abi,
            "bytecode": bytecode,
            "build_tag": build_tag,
        }

        destination_filename = os.path.join(artifacts_dir, f"{name}.json")
        with open(destination_filename, "w") as fp:
            json.dump(artifact, fp, indent=4)


if __name__ == "__main__":
    main()
