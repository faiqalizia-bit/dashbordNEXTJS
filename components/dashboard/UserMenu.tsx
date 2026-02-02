function UserMenu({ user }) {
  return (
    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
      <ul className="text-sm">
        <li className="px-4 py-2 hover:text-primary">{user.name}</li>
        <li className="px-4 py-2 hover:text-primary">{user.email}</li>
      </ul>
    </div>
  );
}

export default UserMenu;