"use client";
import React from "react";
import { RoleComboboxPopover } from "@/components/ui/role-combobox-popover";
import { InputField } from '@/components/form/input-field';
import { Button } from '@/components/ui/button';

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto py-8 w-full">
      <InputField
        label="First Name"
        name="first_name"
        value={form.first_name || ''}
        onChange={handleChange}
        required
        description="The person's first name"
        className="w-full"
      />
      
      <InputField
        label="Last Name"
        name="last_name"
        value={form.last_name || ''}
        onChange={handleChange}
        required
        description="The person's last name"
        className="w-full"
      />

      <InputField
        label="Phone Number"
        name="phone_number"
        value={form.phone_number || ''}
        onChange={handleChange}
        className="w-full"
      />
      
      <InputField
        label="Email"
        name="email"
        value={form.email || ''}
        onChange={handleChange}
        className="w-full"
      />

      <div>
        <label className="block">Roles</label>
        <RoleComboboxPopover
          roles={Array.isArray(form.role_ids) ? form.role_ids : []}
          setRoles={(roles) => setForm((f) => ({ ...f, role_ids: roles }))}
        />
      </div>


      <div className="pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
