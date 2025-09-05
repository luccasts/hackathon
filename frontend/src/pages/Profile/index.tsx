import { FaUserCircle, FaEdit } from "react-icons/fa";

interface ProfilePageProps {
  userName?: string;
  userEmail?: string;
  userBio?: string;
  testsCompleted?: number;
  profileImageUrl?: string;
}

export default function ProfilePage({
  userName = "Nome do Usuário",
  userEmail = "usuario@example.com",

  profileImageUrl,
}: ProfilePageProps) {
  const mockTests = [
    {
      id: 1,
      name: "Triagem",
      score: "Risco Alto",
      date: "2023-10-26",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-100 border-2 border-blue-400 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Foto de Perfil"
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUserCircle className="text-blue-500 w-full h-full p-2" />
            )}
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{userName}</h1>
            <p className="text-lg text-gray-600 mt-1">{userEmail}</p>

            <div className="flex items-center justify-center md:justify-start text-gray-500 mt-4 space-x-4">
              <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
                <FaEdit className="mr-2" /> Editar Perfil
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-3">
            Triagem Realizadas
          </h2>
          {mockTests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-red-50 border-2 border-red-400 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-bold text-red-800">
                    {test.name}
                  </h3>
                  <p className="text-red-700 mt-1">Resultado: {test.score}</p>
                  <p className="text-red-600 text-sm">Data: {test.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Nenhum teste realizado ainda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
