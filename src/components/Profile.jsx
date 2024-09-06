import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: { Authorization: token },
          }
        );
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        alert("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedProfile = { username, email };
      await axios.put(
        "http://localhost:5000/api/auth/profile",
        updatedProfile,
        {
          headers: { Authorization: token },
        }
      );
      setUser({ ...user, username, email });
      alert("Updating Successful");
      navigate("/home");
    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
        <div className="mt-5">
          <a href="/home" >
            <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Back
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
