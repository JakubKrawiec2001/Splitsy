import { avatars } from "@/constansts";

type Props = {
  selectedAvatar: string;
  setSelectedAvatar: (selectedAvatar: string) => void;
};

const AvatarSelection = ({ props }: { props: Props }) => {
  const { selectedAvatar, setSelectedAvatar } = props;
  return (
    <div className="mt-8">
      <h2 className="font-bold text-customBlack md:text-lg">
        Choose an Avatar
      </h2>
      <div className="grid grid-cols-5 grid-rows-2 gap-2 mt-4 md:w-[60%] lg:w-[70%]">
        {avatars.map((avatar, i) => {
          return (
            <img
              src={avatar.url}
              alt="avatar"
              key={i}
              className={`cursor-pointer hover:opacity-100 transition-all ${
                selectedAvatar === avatar.url ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => setSelectedAvatar(avatar.url)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AvatarSelection;
