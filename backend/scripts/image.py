import os
from PIL import Image

def resize_image(input_image_path, output_image_path, width):
    original_image = Image.open(input_image_path)
    original_width, original_height = original_image.size
    aspect_ratio = float(original_height) / float(original_width)
    new_height = int(width * aspect_ratio)

    resized_image = original_image.resize((width, new_height), Image.ANTIALIAS)
    resized_image.save(output_image_path)

def process_images(input_folder, output_folder, sizes):
    for root, dirs, files in os.walk(input_folder):
        for file in files:
            if file.lower().endswith((".jpg", ".jpeg", ".png")):
                input_image_path = os.path.join(root, file)
                file_name, _ = os.path.splitext(file)

                relative_path = os.path.relpath(root, input_folder)
                current_output_folder = os.path.join(output_folder, relative_path)

                if not os.path.exists(current_output_folder):
                    os.makedirs(current_output_folder)

                for width, name in sizes:
                    output_image_path = os.path.join(current_output_folder, f"{file_name}_{name}.jpg")
                    resize_image(input_image_path, output_image_path, width)


def create_folder(folder_path: str) -> bool:
    try:
        os.makedirs(folder_path, exist_ok=True)
        return True
    except Exception as e:
        print(f"Не удалось создать папку: {e}")
        return False

def checking_folder_exists(folder_path: str) -> bool:
    return os.path.exists(folder_path) and os.path.isdir(folder_path)

input_folder = "./scripts/portfolio"
output_folder = "./scripts/out"

sizes = [
    (640, "640w"),
    (750, "750w"),
    (828, "828w"),
    (1080, "1080w"),
    (1200, "1200w"),
    (1920, "1920w"),
    (2048, "2048w"),
]

if checking_folder_exists(input_folder) != True:
  exit("There is no folder with pictures")

if checking_folder_exists(output_folder) != True:
  result = create_folder(output_folder)
  if (result != True):
    exit("Failed to create folder")

process_images(input_folder, output_folder, sizes)