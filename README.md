
This Chrome extension allows users to export integrations from Oracle Integration Cloud (OIC) and upload them to a GitHub repository. 
The extension makes API calls to IDCS (Oracle Identity Cloud Service) and OIC (Oracle Integration Cloud) to authenticate and retrieve the Integration file, and then uses the GitHub API to upload the integration file.

Features:
Export OIC integrations: Users can select an integration from their OIC instance and export it as a file.
Authentication with IDCS: The extension makes an API call to IDCS to obtain an authentication token, which is required to access the OIC APIs.
GitHub integration: After exporting the integration, the extension makes an API call to GitHub to upload the integration file to a specific repository. 

Prerequisites:
Before using the extension, ensure you have the following:
Google Chrome browser installed on your computer. An active OIC instance with integrations that you want to export. Access to an Oracle IDCS account with the necessary permissions to authenticate and retrieve data from OIC. A GitHub account and a repository where you want to upload the integration files. 

Installation:
To install the Chrome extension, follow these steps: Clone/Download the extension package from the GitHub repository.
Extract the downloaded package to a local directory on your computer. 
Run the commend `npm Install` in the root directory this command will install all the Dependencies and will create a folder named "node_modules".
You will need also to create a .env file to store all your IDCS/OIC sensitive data which used in the code.
Your .env file souled look like this.

 









To load the extensions you will need to run this command `npm run build`, this command will create a folder named "build" this folder will upload to Chrome Extensions.
Your folders structure souled look like this:
 
 
Open Google Chrome and navigate to chrome://extensions. Enable the "Developer mode" toggle switch in the top right corner of the page. Click the "Load unpacked" button and select the build directory. The extension should now be installed and visible in your Chrome browser.

Configuration:
Before using the extension, you need to configure it with the necessary information. Follow these steps to configure the extension: Click on the extension icon in the Chrome toolbar to open the extension popup. 
1-Token, your GitHub token.
2-Branch name, your GitHub branch.
3-Git user, your GitHub username.
4-Repo name, your GitHub repo name.
 

Limitations:
The extension currently supports exporting and uploading one integration at a time. The exported integration file will be in a specific format compatible with OIC. Make sure you have the necessary tools and knowledge to work with OIC integration files.

Troubleshooting: 
If you encounter any issues while using the extension, consider the following troubleshooting steps: Ensure that you have provided the correct configuration details in the extension settings. Check your internet connection to ensure that you can access OIC, IDCS, and GitHub. Verify that the selected integration in OIC is valid and does not have any errors or dependencies that may affect the export process (Only an activated integration can be export).
Make sure you have the necessary permissions and access rights in OIC, IDCS, and GitHub to perform the required actions. Check the extension popup inspect for any error messages or status updates that may provide insights into the issue.
If the problem persists, try restarting the extension. If none of the above steps resolve the problem, consider reaching out to the extension developer or referring to the documentation for further assistance. 

Security Considerations: 
When using the Chrome extension, it is important to keep the following security considerations in mind: 
Protect your IDCS Client ID and Client Secret: Ensure that these credentials are kept confidential (In the .ENV file) and not shared with unauthorized individuals.
Secure your GitHub Token: Treat the GitHub access token as sensitive information and store it securely.
Be cautious not to expose the token and the .env file in public repositories or insecure environments. Validate the extension source: Before installing the extension, verify that it comes from a trusted source to minimize the risk of malicious code execution. Disclaimer This Chrome extension is provided as-is without any warranties or guarantees. The extension author and contributors are not responsible for any damages or issues caused using this extension. Use it at your own risk.

License: 
The extension is released under the MIT License. You are free to modify and distribute the extension in accordance with the terms of this license.

Contributions:
Contributions to the extension are welcome. If you have suggestions, bug reports, or would like to contribute to its development, please refer to the GitHub repository for more information.

About the Author:
This Chrome extension was developed by Avraham Taga and OCS Tech IL as an IP project. Feel free to contact me at avraham.taga@oracle.com for any inquiries or feedback.

Acknowledgments:
The extension makes use of various libraries and APIs, including the IDCS (Oracle Identity Cloud Service), Oracle Integration Cloud (OIC) API and GitHub API.
Thank you for using the Chrome extension for exporting OIC integrations and uploading them to GitHub.
We hope this extension helps streamline your workflow and enhances your integration management experience. If you have any questions or need further assistance, please don't hesitate to reach out.

Happy exporting and uploading!
