import { useState } from "react";
import FileUpload from "../FileUpload/FileUpload";
import "./Form.css";

function Form() {
  const [inputs, setInputs] = useState({});
  const [toggle, setToggle] = useState(true);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    localStorage[name] = value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setToggle(!toggle);
    localStorage["toggle"] = toggle;
    console.log(inputs);
    console.log(toggle);
  };

  return (
    <div>
      {!localStorage["toggle"] ? (
        <div id="form-continar">
          <h3>Please set your Git-Hub API configurations:</h3>
          <form onSubmit={handleSubmit}>
            <label>Token</label>
            <br />
            <input
              type="text"
              name="token"
              value={inputs.token || ""}
              onChange={handleChange}
              required
            />
            <br />
            <label>Branch name</label>
            <br />
            <input
              type="text"
              name="branchname"
              value={inputs.branchname || ""}
              onChange={handleChange}
              required
            />
            <br />
            <label>Git User</label>
            <br />
            <input
              type="text"
              name="gituser"
              value={inputs.gituser || ""}
              onChange={handleChange}
              required
            />

            <br />
            <label>Repo name</label>
            <br />
            <input
              type="text"
              name="reponame"
              value={inputs.reponame || ""}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <input type="submit" value="Sava Configurations" />
          </form>
        </div>
      ) : (
        <FileUpload data={inputs} />
      )}
    </div>
  );
}

export default Form;
