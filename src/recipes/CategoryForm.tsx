import "./RecipeForm.css";
import { useState } from "react";
import { addCategory, Category } from "../services/apiFacade";
import { useLocation } from "react-router-dom";

const EMPTY_CATEGORY = {
    id: null,
    name: "",
    };

export default function CategoryForm() {
    const categoryToEdit = useLocation().state || null;
    const [formData, setFormData] = useState<Category>(categoryToEdit || EMPTY_CATEGORY);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newCategory = await addCategory(formData);
        alert("New category added")
        console.info("New/Edited Category", newCategory);
    }

    return (
        <>
        <h2>Categories Add/Edit/Delete</h2>
        <form id="categoryForm">
            <div className="form-group">
                <label htmlFor="id">ID:</label>
                <input type="text" id="name" name="name" disabled value={formData.id || ""} />
            </div>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
            </div>
            </form>
            {/*Yoinked ur css, ha */}
            <button className="recipe-form-btn" onClick={handleSubmit}>Submit</button>
            <button className="recipe-form-btn" onClick={() => {
                setFormData({ ...EMPTY_CATEGORY });
                }}
                >
                    Cancel
                </button>

            
        </>
    )
}
