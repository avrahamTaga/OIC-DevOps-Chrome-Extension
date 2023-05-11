import React from "react";
import { useEffect } from "react";
import axios from "axios";
import "./FileUpload.css";

function FileUpload() {
  const IdcsURL = process.env.REACT_APP_IDCS_URL;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECEET = process.env.REACT_APP_CLIENT_SECEET;
  const IDCS_USER_NAME = process.env.REACT_APP_IDCS_USER_NAME;
  const IDCS_PASSWORD = process.env.REACT_APP_IDCS_PASSWORD;
  const SCOPE = process.env.REACT_APP_SCOPE;
  const authorizationBasic = btoa(`${CLIENT_ID}:${CLIENT_SECEET}`);
  let idcs_access_token = "";

  let integrationName = "";
  let integrationVersion = "";
  let integrationID = "";

  // Get IntegrationID From Chrome Current Tab
  const chrome = window.chrome;
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);
    integrationName = url.searchParams.get("code");
    integrationVersion = url.searchParams.get("version");
    integrationID = integrationName + "|" + integrationVersion;
  });

  //Get File From GitHub
  useEffect(() => {
    async function get_file() {
      console.log(integrationID);
      let integrationFileName = `${integrationID}.iar`;
      let GithubURL = `https://api.github.com/repos/${username}/${reponame}/contents/${integrationFileName}`;

      if (integrationID !== "null|null") {
        let response = await fetch(GithubURL, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log(
            `Failed to get ${integrationFileName} integration archive from GitHub:`
          );
        }
        const data = await response.json();
        console.log(data.sha);
        localStorage["sha"] = data.sha;
      }
    }
    window.onhashchange = get_file();
    return () => {
      window.onhashchange = null;
      window.onpopstate = null;
    };
  }, []);

  // Get IDCS Token
  const data = {
    grant_type: "password",
    username: IDCS_USER_NAME,
    password: IDCS_PASSWORD,
    scope: SCOPE,
  };

  async function getToken() {
    try {
      let response = await axios.post(IdcsURL, data, {
        headers: {
          Authorization: `Basic ${authorizationBasic}`,
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      idcs_access_token = response.data.access_token;
      console.log(idcs_access_token);
      getIntegrationFile();
    } catch (error) {
      console.error(error);
    }
  }

  // Get OIC Integration File
  async function getIntegrationFile() {
    let url = `https://integrationcloudtest-idoroman.integration.ocp.oraclecloud.com/ic/api/integration/v1/integrations/${integrationID}/archive`;

    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${idcs_access_token}`,
        },
      });

      if (!response) {
        throw new Error(
          `Failed to fetch integration archive: ${response.status} ${response.statusText}`
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
      );

      localStorage["fileContent"] = base64String;
      upload_file();
    } catch (error) {
      console.error(error);
    }
  }

  // Upload Integration File To GITHUB
  let token = localStorage["token"];
  let username = localStorage["gituser"];
  let reponame = localStorage["reponame"];

  async function upload_file() {
    let fileContent = localStorage["fileContent"];
    let sha = localStorage["sha"];
    let integrationFileName = `${integrationID}.iar`;
    let GithubURL = `https://api.github.com/repos/${username}/${reponame}/contents/${integrationFileName}`;
    console.log(sha);

    let response = await fetch(GithubURL, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload integration archive ${integrationFileName}`,
        content: fileContent,
        sha: sha,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to upload integration archive to GitHub: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);
    localStorage["sha"] = data.content.sha;
  }

  return (
    <div className="FileUpload">
      <h2>Upload Your File</h2>
      <button onClick={getToken}>Upload File</button>
    </div>
  );
}

export default FileUpload;
