        document.getElementById('callFunctionButton').addEventListener('click', async () => {
            const name = document.getElementById('nameInput').value;
            const functionAppUrl = "https://insanebrain.azurewebsites.net/api/httptrigger1";
            const targetUrl = `${functionAppUrl}?name=${encodeURIComponent(name)}`; // Encode the name for URL safety

            const responseDisplay = document.getElementById('functionResponse');
            responseDisplay.textContent = 'Calling function...';

            try {
                // Make the GET request to your Azure Function
                const response = await fetch(targetUrl);

                // Check if the request was successful (status code 200-299)
                if (response.ok) {
                    const data = await response.text(); // Get the response body as plain text
                    responseDisplay.textContent = `Function Response: ${data}`;
                } else {
                    // Handle HTTP errors (e.g., 400 Bad Request, 500 Internal Server Error)
                    const errorText = await response.text();
                    responseDisplay.textContent = `Error: ${response.status} - ${errorText}`;
                    console.error('Function call failed:', response.status, errorText);
                }
            } catch (error) {
                // Handle network errors (e.g., no internet, CORS preflight blocked)
                responseDisplay.textContent = `Network Error: ${error.message}`;
                console.error('Network error during function call:', error);
            }
        });
