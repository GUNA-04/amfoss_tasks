from PIL import Image, ImageFilter, ImageOps
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"/usr/bin/tesseract"

image_path = "/home/guna-maneesh/Downloads/task2.png"

def preprocess_image(image_path):
    image = Image.open(image_path)
    image = image.convert("L")
    image = ImageOps.autocontrast(image)
    image = image.filter(ImageFilter.SHARPEN)
    return image

def evaluate_expression(image_path):
    processed_image = preprocess_image(image_path)
    extracted_text = pytesseract.image_to_string(processed_image, config='--psm 7')
    extracted_text = extracted_text.strip()

    try:
        expression = extracted_text.rstrip('=')
        result = eval(expression)
        print(f"Extracted Expression: {expression}")
        print(f"Result: {result}")
    except Exception as e:
        print(f"Error evaluating expression: {extracted_text}")
        print(f"Error details: {e}")

evaluate_expression(image_path)

