import { uploadFile } from "../actions/uploadFile";
export default function Page() {
  return (
    <form action={uploadFile}>
      <label>
        Upload File:
        <input type="file" id="file" name="file" />
      </label>
      <label>
        Classification:
        <select id="classification" name="classification">
          <option value="">Select an option</option>
          <option value="rock">Rock</option>
          <option value="fossil">Fossil</option>
        </select>
      </label>
      <button>Submit</button>
    </form>
  );
}
