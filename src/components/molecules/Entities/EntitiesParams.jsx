// Local Imports
import { Avatar, Box } from "components/ui";

// ----------------------------------------------------------------------

export function EntitiesParams({ name }) {
    const now = new Date();
    const day = now.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    const time = now.toLocaleString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <Box className="rounded-lg bg-info/10 px-4 pb-5 dark:bg-dark-800">
            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <h2 className="truncate text-sm-plus font-medium tracking-wide text-gray-800 dark:text-dark-100">
                Statistics
                </h2>
                {/* <ActionMenu /> */}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between gap-4">
                    <Avatar size={16} src="/images/200x200.png" />
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{day}</p>
                        <p className="text-xl font-medium text-gray-800 dark:text-dark-100">
                            {time}
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-dark-100">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-dark-300">Free Package</p>
                </div>
                <div className="space-y-3 text-xs-plus">
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-800 dark:text-dark-100">
                        Entities
                        </p>
                        <p className="text-right">3</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-800 dark:text-dark-100">
                        Users
                        </p>
                        <p className="text-right">1</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-800 dark:text-dark-100">
                        Branches
                        </p>
                        <p className="text-right">7</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-800 dark:text-dark-100">
                        Products
                        </p>
                        <p className="text-right">164</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-gray-800 dark:text-dark-100">
                        Register Date
                        </p>
                        <p className="text-right">16 Jun 2020</p>
                    </div>
                </div>
            </div>
        </Box>
    );
}

// function ActionMenu() {
//   return (
//     <Menu
//       as="div"
//       className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5"
//     >
//       <MenuButton
//         as={Button}
//         variant="flat"
//         isIcon
//         className="size-8 rounded-full"
//       >
//         <EllipsisHorizontalIcon className="size-5" />
//       </MenuButton>
//       <Transition
//         as={Fragment}
//         enter="transition ease-out"
//         enterFrom="opacity-0 translate-y-2"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition ease-in"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 translate-y-2"
//       >
//         <MenuItems className="absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden dark:border-dark-500 dark:bg-dark-700 dark:shadow-none ltr:right-0 rtl:left-0">
//           <MenuItem>
//             {({ focus }) => (
//               <button
//                 className={clsx(
//                   "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
//                   focus &&
//                     "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
//                 )}
//               >
//                 <span>Action</span>
//               </button>
//             )}
//           </MenuItem>
//           <MenuItem>
//             {({ focus }) => (
//               <button
//                 className={clsx(
//                   "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
//                   focus &&
//                     "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
//                 )}
//               >
//                 <span>Another action</span>
//               </button>
//             )}
//           </MenuItem>
//           <MenuItem>
//             {({ focus }) => (
//               <button
//                 className={clsx(
//                   "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
//                   focus &&
//                     "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
//                 )}
//               >
//                 <span>Other action</span>
//               </button>
//             )}
//           </MenuItem>

//           <hr className="mx-3 my-1.5 h-px border-gray-150 dark:border-dark-500" />

//           <MenuItem>
//             {({ focus }) => (
//               <button
//                 className={clsx(
//                   "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
//                   focus &&
//                     "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
//                 )}
//               >
//                 <span>Separated action</span>
//               </button>
//             )}
//           </MenuItem>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   );
// }
