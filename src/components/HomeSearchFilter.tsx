import { Input } from "./ui";

const HomeSearchFilter = () => {
  return (
    <div className="flex gap-2 items-center">
      <Input className="flex-1" type="text" placeholder="Search" />
    </div>
  );
};

export default HomeSearchFilter;
