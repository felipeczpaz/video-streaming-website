import os

# The comment block to be added
comment_block = '''/*
************************************************************
*                                                          *
*   Flowhooks Software - Open Source License               *
*                                                          *
*  This software is licensed under the GNU Affero General   *
*  Public License v3. You may use, modify, and distribute   *
*  this code under the terms of the AGPLv3.                *
*                                                          *
*  This program is distributed in the hope that it will be  *
*  useful, but WITHOUT ANY WARRANTY; without even the       *
*  implied warranty of MERCHANTABILITY or FITNESS FOR A     *
*  PARTICULAR PURPOSE. See the GNU AGPLv3 for more details. *
*                                                          *
*  Author: Felipe Cezar Paz (git@felipecezar.com)          *
*  File:                                                   *
*  Description:                                            *
*                                                          *
************************************************************
*/\n
'''

def prepend_license_to_files(root_dir, extensions=(".js", ".ts", ".jsx", ".tsx")):
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(extensions):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    if comment_block.strip() in content:
                        continue  # Skip if the license is already present

                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(comment_block + content)
                    
                    print(f"License added to: {file_path}")
                except Exception as e:
                    print(f"Failed to process {file_path}: {e}")

if __name__ == "__main__":
    directory = input("Enter the root directory path: ").strip()
    if os.path.isdir(directory):
        prepend_license_to_files(directory)
    else:
        print("Invalid directory path.")
