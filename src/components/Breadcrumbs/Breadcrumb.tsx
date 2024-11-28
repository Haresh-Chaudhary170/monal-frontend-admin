"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface BreadcrumbProps {
  prevPageName?: string;
  prevPageName2?: string;
  pageName: string;
}
const Breadcrumb = ({
  prevPageName,
  prevPageName2,
  pageName,
}: BreadcrumbProps) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-white dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li className="text-zinc-400 hover:text-zinc-100">
            <Link className="font-medium" href="/">
              Dashboard /{" "}
            </Link>
          </li>
          <li
            className="cursor-pointer font-medium text-zinc-400 hover:text-zinc-100"
            onClick={goBack}
          >
            {prevPageName ? `${prevPageName} /` : ""}
          </li>
          <li
            className="cursor-pointer font-medium text-zinc-400 hover:text-zinc-100"
            onClick={goBack}
          >
            {prevPageName2 ? `${prevPageName2} /` : ""}
          </li>

          <li className="font-medium text-white">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
