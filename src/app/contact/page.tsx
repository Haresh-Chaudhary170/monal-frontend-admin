import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Contact } from "@/types/contact";

export const metadata: Metadata = {
  title: "Table",
  description: "This is Next.js",
};

const productData: Contact[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    phone: 29996356,
    address: "Austrilia",
    message: "Hello from booking",
  },
  {
    name: "Anna Hoe",
    email: "anna@hotmail.com",
    phone: 29996322,
    address: "California",
    message: "Please book double seat for tonight date.",
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    phone: 29996356,
    address: "Austrilia",
    message: "Hello from booking",
  },
];

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Contacts" />
      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Contacts from the Website
            </h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">S.N</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Name</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Number</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Email</p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Message</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Date</p>
            </div>
          </div>

          {productData.map((product, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 sm:grid-cols-8 md:px-6 2xl:px-7.5 bg-zinc-50"
              key={key}
            >
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{key + 1}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.name}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.phone}
                </p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.email}
                </p>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.message}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm ">{new Date().getTime()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
