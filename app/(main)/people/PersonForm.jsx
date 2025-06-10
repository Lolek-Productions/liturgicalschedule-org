"use client";
import React from "react";
import { RoleComboboxPopover } from "@/components/ui/role-combobox-popover";

/**
 * PersonForm component for create/edit person
 * @param {Object} props
 * @param {Object} [props.initialValues]
 * @param {function} props.onSubmit
 * @param {boolean} [props.loading]
 * @returns {JSX.Element}
 */
export default function PersonForm({ initialValues = {}, onSubmit, loading }) {
  const [form, setForm] = React.useState({
    first_name: initialValues.first_name || "",
    last_name: initialValues.last_name || "",
    phone_number: initialValues.phone_number || "",
    email: initialValues.email || "",
    role_ids: initialValues.role_ids || [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-0.5">First Name</label>
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-0.5">Last Name</label>
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-0.5">Phone Number</label>
        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-0.5">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}  
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-0.5">Roles</label>
        <RoleComboboxPopover
          roles={Array.isArray(form.role_ids) ? form.role_ids : []}
          setRoles={(roles) => setForm((f) => ({ ...f, role_ids: roles }))}
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
