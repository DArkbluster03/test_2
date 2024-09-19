import React, { useState } from "react";
import { useDeleteBlogMutation, useFetchBlogsQuery } from "../../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utilis/dateFormater";
import { MdModeEdit } from "react-icons/md";

const ManagePosts = () => {
  const [query, setQuery] = useState({ search: "", category: "" });
  const { data: blogs = [], error, isLoading, refetch } = useFetchBlogsQuery(query); 
  const [deletePost] = useDeleteBlogMutation(); 

  const handleDelete = async (id) => {
    try {
      const response = await deletePost(id).unwrap();
      alert(response.message);
      refetch(); // Manually refetch blogs after deletion
    } catch (error) {
      console.error("Failed to delete the blog post:", error);
    }
  };

  const handleFilterChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch(); // Refetch with the updated query
  };

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Blogs
                  </h3>
                </div>
              </div>
              <form onSubmit={handleSearch} className="flex gap-4 my-4">
                <input
                  type="text"
                  name="search"
                  value={query.search}
                  onChange={handleFilterChange}
                  placeholder="Search by blog name..."
                  className="border px-4 py-2"
                />
                <select
                  name="category"
                  value={query.category}
                  onChange={handleFilterChange}
                  className="border px-4 py-2"
                >
                  <option value="">All Categories</option>
                  <option value="HTML">HTML</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="MongoDB">MongoDB</option>
                  <option value="Express">Express</option>
                  <option value="Node.js">Node.js</option>
                  <option value="React">React</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">
                  Apply Filters
                </button>
              </form>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Blog name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Category
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Publishing date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading && <tr><td>Loading...</td></tr>}
                  {error && <tr><td>Failed to load blogs.</td></tr>}
                  {blogs.length === 0 && <tr><td>No blogs found.</td></tr>}
                  {
                    blogs && blogs.map((blog, index) => (
                      <tr key={blog._id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {blog.title}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {blog.category}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {formatDate(blog.createdAt)}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <Link to={`/dashboard/update-items/${blog._id}`} className="hover:text-blue-700">
                            <span className="flex gap-1 items-center justify-center">
                              <MdModeEdit />
                              Edit
                            </span>
                          </Link>
                        </td>
                        <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button className="bg-red-600 text-white px-2 py-1" onClick={() => handleDelete(blog._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManagePosts;
