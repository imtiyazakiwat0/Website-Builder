// Helper function to send a request to the ChatGPT API
async function generateCode(prompt) {
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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', // Replace with your actual API key
      },
      body: JSON.stringify({
        'prompt': prompt,
        'max_tokens': 100,
      }),
    });
  
    const data = await response.json();
    return data.choices[0].text.trim();
  }
  // Generate HTML code
  async function generateHTMLCode() {
    const prompt = userInput+'Generate HTML code for this';
    const htmlCode = await generateCode(prompt);
    console.log(prompt);
    return htmlCode;
  }
  
  // Generate CSS code
  async function generateCSSCode(htmlCode) {
    const prompt = `Generate CSS code for the following HTML:\n${htmlCode}`;
    const cssCode = await generateCode(prompt);
    return cssCode;
  }
  
  // Generate JavaScript code
  async function generateJSCode(htmlCode, cssCode) {
    const prompt = `Generate JavaScript code for the following HTML and CSS:\nHTML:\n${htmlCode}\nCSS:\n${cssCode}`;
    const jsCode = await generateCode(prompt);
    return jsCode;
  }
  
  // Save the generated code as files
  function saveCodeToFile(filename, code) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  // Generate and save the required code files
  async function generateAndSaveCodeFiles() {
    const spinner = document.getElementById('spinner');
    const generateButton = document.getElementById('generate-button');
    const container = document.getElementById('generated-html-container');
    const userInput = document.querySelector("#user-input").value;

  
    spinner.classList.remove('d-none'); // Show the spinner
    generateButton.classList.add('d-none'); // Hide the generate button
  
    const htmlCode = await generateHTMLCode();
    const cssCode = await generateCSSCode(htmlCode);
    const jsCode = await generateJSCode(htmlCode, cssCode);
  
    saveCodeToFile('index.html', htmlCode);
    saveCodeToFile('styles.css', cssCode);
    saveCodeToFile('script.js', jsCode);
  
    const file = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(file);
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.innerHTML = 'Open website';
    button.addEventListener('click', () => {
      window.open(url, '_blank');
    });
    container.innerHTML = ''; // Clear any previous content in container
    container.appendChild(button);
  
    spinner.classList.add('d-none'); // Hide the spinner
    generateButton.classList.remove('d-none'); // Show the generate button
  }
  
  // Attach an event listener to the "Generate Your Website" button
  const generateButton = document.getElementById('generate-button');
  generateButton.addEventListener('click', (event) => {
    event.preventDefault();
    generateAndSaveCodeFiles();
  });
  
  // Open website option
  const openWebsiteButton = document.getElementById('open-website-button');
  openWebsiteButton.addEventListener('click', () => {
    window.open('index.html', '_blank');
  });
  