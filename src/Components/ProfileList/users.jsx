import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Users() {
    const [list, setList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const navigator = useNavigate()

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}api/users?page=${pageNumber}`)
            .then((res) => {
                setList(res.data.data);
            })
            .catch(() => {
                console.log("fail");
            });
    }, [pageNumber]);

    function ModifyPage(operator) {
        if (operator === "add" && pageNumber < 2) {
            setPageNumber(pageNumber + 1);
        } else if (operator === "subtract" && pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    function EditUser(id) {
        navigator(`/EditUser/${id}`)
    }

    function deleteUser(id) {
        axios.delete(`${import.meta.env.VITE_BASE_URL}api/users/${id}`)
            .then((res) => {
                console.log("delete Api", res)
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User List</h1>

            {/* User Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
                {list.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
                    >
                        <img
                            className="h-24 w-24 rounded-full border-4 border-purple-500"
                            src={user.avatar || "/img/default-avatar.jpg"}
                            alt={user.name}
                        />
                        <h2 className="text-lg font-semibold text-gray-900 mt-3">
                            {user.first_name} {user.last_name}
                        </h2>
                        <p className="text-gray-500">{user.email || "No email available"}</p>

                        <div className="flex gap-4 mt-4">
                            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition" onClick={() => { deleteUser(user.id) }}>
                                Delete
                            </button>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-600 transition" onClick={() => EditUser(user.id)}>
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    className={`px-6 py-2 text-lg rounded-md transition ${pageNumber === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => ModifyPage("subtract")}
                    disabled={pageNumber === 1}
                >
                    Prev
                </button>

                <button
                    className={`px-6 py-2 text-lg rounded-md transition ${pageNumber === 1 ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setPageNumber(1)}
                >
                    1
                </button>

                <button
                    className={`px-6 py-2 text-lg rounded-md transition ${pageNumber === 2 ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => setPageNumber(2)}
                >
                    2
                </button>

                <button
                    className={`px-6 py-2 text-lg rounded-md transition ${pageNumber === 2 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    onClick={() => ModifyPage("add")}
                    disabled={pageNumber === 2}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Users;
