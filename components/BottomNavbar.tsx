import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"

export default function BottomNavbar() {
  const router = useRouter()
  const isHome = router.pathname == "/"
  const isGenerate = router.pathname == "/generate"
  const isSearch = router.pathname == "/search"

  return (
    <div className="sm:hidden h-14 w-screen fixed bottom-0 z-50 flex flex-row items-center justify-between backdrop-blur bg-opacity-80 border-t border-opacity-50 text-sm select-none bg-zinc-900 border-t-zinc-700">
      <div className="flex items-center justify-center h-full w-full">
        <Link
          href="/"
          className={classNames(
            "flex flex-row relative items-center cursor-pointer h-full justify-center transition-all flex-1 hover:text-white",
            {
              "text-white": isHome,
              "text-white/30": !isHome,
            }
          )}
        >
          <div className="flex items-center justify-center text-xl w-full">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          {isHome && (
            <div className="absolute w-full border-b-2 border-b-violet-600 bottom-0"></div>
          )}
        </Link>
        <Link
          href="/generate"
          className={classNames(
            "flex flex-row relative items-center cursor-pointer h-full justify-center transition-all flex-1 hover:text-white",
            {
              "text-white": isGenerate,
              "text-white/30": !isGenerate,
            }
          )}
        >
          <div className="flex items-center justify-center text-xl w-full">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
              <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
              <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
              <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
              <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
              <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
            </svg>
          </div>
          {isGenerate && (
            <div className="absolute w-full border-b-2 border-b-violet-600 bottom-0"></div>
          )}
        </Link>
        <Link
          href="/search"
          className={classNames(
            "flex flex-row relative items-center cursor-pointer h-full justify-center transition-all flex-1 hover:text-white",
            {
              "text-white": isSearch,
              "text-white/30": !isSearch,
            }
          )}
        >
          <div className="flex items-center justify-center text-xl w-full">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="4"
              viewBox="0 96 960 960"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
            </svg>
          </div>
          {isSearch && (
            <div className="absolute w-full border-b-2 border-b-violet-600 bottom-0"></div>
          )}
        </Link>
      </div>
    </div>
  )
}
