import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { API } from "aws-amplify"
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton"
import { onError } from "../libs/errorLib"
import config from "../config"
import "./NewNote.css"

export default function NewNote() {
  const file = useRef(null);
  const history = useHistory();
  const [name, setName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ content, attachment });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }


  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <ControlLabel>
            Name
          </ControlLabel>
          <FormControl
            value={name}
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="datefrom">
          <ControlLabel>
            Date From
          </ControlLabel>
          <FormControl
            value={dateFrom}
            type="text"
            onChange={e => setDateFrom(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="dateto">
          <ControlLabel>
            Date To
          </ControlLabel>
          <FormControl
            value={dateTo}
            type="text"
            onChange={e => setDateTo(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="budget">
          <ControlLabel>
            Budget
          </ControlLabel>
          <FormControl
            value={budget}
            type="text"
            onChange={e => setBudget(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="description">
          <ControlLabel>
            Description
          </ControlLabel>
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}