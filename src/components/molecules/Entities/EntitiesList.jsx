import { EntitiesCard } from "components/atoms/Entities/EntitiesCard";

const requests = [
    {
        id: 1,
        name: "Company Example",
        avatar: "/images/200x200.png",
        address: "Jakarta Pusat",
        date: "Thu, 26 March",
        time: "08:00",
        admin: 12,
        branch: 2,
    },
    {
        id: 2,
        name: "PT. Entities Sejahtera",
        avatar: "/images/200x200.png",
        address: "Medan",
        date: "Mon, 15 March",
        time: "09:00",
        admin: 8,
        branch: 3,
    },
    {
        id: 3,
        name: "PT. Simons Bersaudara",
        avatar:null,
        address: "Bandung",
        date: "Wed, 14 March",
        time: "11:00",
        admin: 4,
        branch: 1,
    }
]

export function EntitiesList() {
    return(
        <div className="mt-4 sm:mt-5 lg:mt-6">
            <div className="flex h-8 items-center justify-between">
                <h2 className="text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
                    My Entities
                </h2>
                <a
                    href="##"
                    className="border-b border-dotted border-current pb-0.5 text-xs-plus font-medium text-primary-600 outline-hidden transition-colors duration-300 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70"
                >
                    View All
                </a>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                {requests.map((request) => (
                    <EntitiesCard 
                        key={request.id}
                        name={request.name}
                        avatar={request.avatar}
                        address={request.address}
                        admin={request.admin}
                        branch={request.branch}
                    />
                ))}
            </div>
        </div>
    )
}