import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Briefcase,
  File,
  FileBadge,
  ReceiptText,
  Search,
  ThumbsUp,
} from "lucide-react";
const Employees = () => {
  const employees = [
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
    {
      nationalId: "1111 1111 1111 1111",
      firstName: "Solomon",
      middleName: "Asregdom",
      lastName: "Balcha",
      phoneNumber: "0982010318",
      status: <ThumbsUp />,
      agentFile: <File />,
      agentAdminFile: <FileBadge />,
      employees: <Briefcase />,
    },
  ];
  return (
    <div className="p-6 border h-full flex flex-col items-center gap-y-14">
      <div className="flex items-center justify-center gap-2 w-full sm:w-3/4 lg:w-5/12 relative">
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
          <Search
            size={22}
            className="text-gray-500 cursor-pointer"
            strokeWidth={5}
          />
        </div>
        <Input
          placeholder="Search by employee name"
          className="py-7 px-14 rounded-lg text-lg focus-visible:ring-customColor"
        />
      </div>
      <div className="w-full">
        <Table className="w-full">
          <TableCaption>All employees availables are here</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-lg text-customColor">
                First Name
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                Middle Name
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                Last Name
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                National Id
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                Phone
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                Status
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                Agent File
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                Admin File
              </TableHead>
              <TableHead className="text-lg text-center text-customColor">
                Employees
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((item, index) => (
              <TableRow
                key={index}
                className={`${index % 2 === 0 ? "" : "bg-gray-100"}`}
              >
                <TableCell>{item.firstName}</TableCell>
                <TableCell className="text-center text-customColor">
                  {item.middleName}
                </TableCell>
                <TableCell className="text-center text-customColor">
                  {item.lastName}
                </TableCell>
                <TableCell className="text-center text-customColor">
                  {item.nationalId}
                </TableCell>
                <TableCell className="text-center text-customColor">
                  {item.phoneNumber}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center text-green-600 cursor-pointer">
                    {item.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center text-customColorThree cursor-pointer">
                    {item.agentFile}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center text-customColorThree  cursor-pointer">
                    {item.agentAdminFile}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-center text-customColorThree  cursor-pointer">
                    {item.employees}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-full mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};
export default Employees;
