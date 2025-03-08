import { useState, ChangeEvent } from "react";
import useFormStore from "../store/Store";
import FormField from "./FormField";

interface NewField {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
  value: string;
}

const FormBuilder = () => {
  const { formFields, addField, removeField, updateField, resetForm } = useFormStore();
  const [newField, setNewField] = useState<NewField>({
    label: "",
    type: "text",
    value: "",
  });

  const handleAddField = () => {
    if (!newField.label.trim()) return alert("Field label cannot be empty!");
    addField(newField);
    setNewField({ label: "", type: "text", value: "" });
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldUpdate = (index: number, updatedField: NewField) => {
    updateField(index, updatedField);
  };

  const handleFieldRemove = (index: number) => {
    removeField(index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Form Builder</h1>

      {/* New Field Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          name="label"
          placeholder="Field Label"
          value={newField.label}
          onChange={handleFieldChange}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="type"
          value={newField.type}
          onChange={handleFieldChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="password">Password</option>
          <option value="textarea">Textarea</option>
          <option value="date">Date</option>
          <option value="file">File</option>
        </select>
        <button
          type="button"
          onClick={handleAddField}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Field
        </button>
      </div>

      {/* Reset Form Button */}
      <button
        type="button"
        onClick={resetForm}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mb-4"
      >
        Reset Form
      </button>

      {/* Dynamic Form Fields */}
      <form className="space-y-4">
        {formFields.map((field, index) => (
          <FormField
            key={index}
            field={field}
            index={index}
            onUpdate={handleFieldUpdate}
            onRemove={handleFieldRemove}
          />
        ))}
      </form>
    </div>
  );
};

export default FormBuilder;
