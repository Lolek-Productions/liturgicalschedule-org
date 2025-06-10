import { getPeople } from "./person-actions";
import Link from "next/link";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";

export default async function ListView({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;
  const sort = searchParams?.sort || "first_name";
  const order = searchParams?.order || "asc";
  const { data: people, count } = await getPeople({ page, pageSize, sort, order });
  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  function getPageLink(pageNum) {
    return `?page=${pageNum}&pageSize=${pageSize}&sort=${sort}&order=${order}`;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">People</h2>
        <Link href="/people/create" className="bg-primary text-white px-3 py-1 rounded">Create Person</Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>
              <Link href={`?sort=first_name&order=${sort === "first_name" && order === "asc" ? "desc" : "asc"}`}>First Name</Link>
            </TableHeader>
            <TableHeader>
              <Link href={`?sort=last_name&order=${sort === "last_name" && order === "asc" ? "desc" : "asc"}`}>Last Name</Link>
            </TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.first_name}</TableCell>
              <TableCell>{person.last_name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.phone_number}</TableCell>
              <TableCell>
                <Link href={`/people/${person.id}/edit`} className="text-blue-600">Edit</Link>
                <span className="mx-2">|</span>
                <Link href={`/people/${person.id}/delete`} className="text-red-600">Delete</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={page} totalPages={totalPages} getPageLink={getPageLink} />
    </div>
  );
}
