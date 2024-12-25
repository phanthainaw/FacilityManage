export async function sendLogInRequest(email, password) {
    try {
        const token= 'Basic '+btoa(`${email}:${password}`);
        const response = await fetch('http://localhost:8080/employees/user',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },

            }
        );
        if (response.ok) {
            sessionStorage.setItem('token',token)
            return await response.json()
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error during GET request:', error);
    }
}

export async function sendGetRequest(url,header=null) {
    try {
        const response = await fetch(url, 
            {
                method: 'GET',
                headers: {
                    ...header,
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('token')
                },
            }
        );
        if (response.ok) {
            return await response.json()
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error during GET request:', error);
    }
}

export async function sendPostRequest(url, json){
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(json)
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error during POST request:', error);
    }
}

export async function sendPatchRequest(url, json) {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(json)
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error during PATCH request:', error);
    }
}

export async function sendDeleteRequest(url, json) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(json),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error during DELETE request:', error);
    }
}
export async function sendPutRequest(url, json) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(json),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error during PUT request:', error);
    }
}






