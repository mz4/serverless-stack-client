import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { API } from "aws-amplify"
import { FormGroup, FormControl, ControlLabel, Form } from "react-bootstrap"
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
          <Form.Label>
            Name
          </Form.Label>
          <FormControl
            value={name}
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="datefrom">
          <Form.Label>
            Date From
          </Form.Label>
          <FormControl
            value={dateFrom}
            type="text"
            onChange={e => setDateFrom(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="dateto">
          <Form.Label>
            Date To
          </Form.Label>
          <FormControl
            value={dateTo}
            type="text"
            onChange={e => setDateTo(e.target.value)}
          />
        </FormGroup>
        <Form.Group controlId="type">
          <Form.Label>
            Type
          </Form.Label>
          <Form.Control 
            value={type}
            as="select" 
            custom
            onChange={e => setType(e.target.value)}
            >
            <option>Holiday</option>
            <option>Work</option>
          </Form.Control>
        </Form.Group>
        <FormGroup controlId="budget">
          <Form.Label>
            Budget
          </Form.Label>
          <FormControl
            value={budget}
            type="text"
            onChange={e => setBudget(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="description">
          <Form.Label>
            Description
          </Form.Label>
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