import { ActivityList } from "components/molecules/Activity/ActivityList";
import { EntitiesList } from "components/molecules/Entities/EntitiesList";
import GreetingSection from "components/molecules/GreetingSection";
import { Page } from "components/shared/Page";
import { columns } from "./columns/columns";
import data from "./data/data.json";
import { EntitiesParams } from "components/molecules/Entities/EntitiesParams";
import { ArticleList } from "components/molecules/ArticleList";

export default function Home() {
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const Name = `${firstName} ${lastName}`;

  return (
    <Page title="Homepage">
      <div className="p-8 grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-9 space-y-6">
          <GreetingSection
            name={Name}
          />
          <EntitiesList />
          <ActivityList
            columns={columns}
            data={data}
            title="User Activity"
            form={false}
            action={false}
          />
        </div>
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:sticky lg:top-20 lg:grid-cols-1 lg:gap-6 lg:self-start">
            <EntitiesParams
              name={Name}
            />
            <ArticleList />
          </div>
        </div>
      </div>
    </Page>
  );
}
