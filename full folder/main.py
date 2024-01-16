import os
import openai

# Set up your OpenAI API credentials
openai.api_key = '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'

# Prompt for the user to generate the Python code
prompt = """
You are a Python bot that creates a website folder. The folder should include HTML, CSS, and JS files.
The folder name will be provided by the user as input. Your task is to generate the Python code to create the website folder.
"""

# Generate Python code using ChatGPT API
response = openai.Completion.create(
    engine='text-davinci-002',
    prompt=prompt,
    max_tokens=100,
    n=1,
    stop=None,
    temperature=0.7
)

# Extract the generated Python code from the API response
python_code = response.choices[0].text.strip()

def create_website_folder(folder_name):
    def generate_code():
        return f"""
import os

os.makedirs('{folder_name}')
os.chdir('{folder_name}')
open('index.html', 'w').close()
open('styles.css', 'w').close()
open('script.js', 'w').close()

print(f"Website folder '{folder_name}' created successfully.")
"""
    exec(generate_code())

# Get user input for the folder name
folder_name = input("Enter the website folder name: ")

# Call the function to create the website folder
create_website_folder(folder_name)