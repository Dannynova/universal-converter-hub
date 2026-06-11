import fitz, inspect
print('replace_image signature:', inspect.signature(fitz.Page.replace_image))
print('get_images signature:', inspect.signature(fitz.Page.get_images))
print('doc extract_image signature:', inspect.signature(fitz.Document.extract_image))
