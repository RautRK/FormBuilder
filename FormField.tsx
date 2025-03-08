interface FormFieldProps {
    field: {
      label: string;
      type: "text" | "number" | "password" | "textarea" | "date" | "file";
      value: string;
    };
    index: number;
    onUpdate: (
      index: number,
      updatedField: {
        label: string;
        type: "text" | "number" | "password" | "textarea" | "date" | "file";
        value: string;
      }
    ) => void;
    onRemove: (index: number) => void;
  }
  
  const FormField: React.FC<FormFieldProps> = ({ field, index, onUpdate, onRemove }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate(index, { ...field, value: e.target.value });
    };
  
    return (
      <div className="flex flex-col gap-2 p-4 border rounded-lg shadow-sm bg-gray-100">
        <label className="text-gray-700 font-medium">{field.label}</label>
  
        {/* Textarea Field */}
        {field.type === "textarea" ? (
          <textarea
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={field.value}
            onChange={handleChange}
          />
        ) : field.type === "file" ? (
          // File Input Field
          <input
            type="file"
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              onUpdate(index, {
                ...field,
                value: e.target.files
                  ? Array.from(e.target.files)
                      .map((file) => file.name)
                      .join(", ")
                  : "",
              })
            }
          />
        ) : (
          // Standard Input Fields
          <input
            type={field.type}
            value={field.type === "file" ? "" : field.value}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        )}
  
        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    );
  };
  
  export default FormField;
  
