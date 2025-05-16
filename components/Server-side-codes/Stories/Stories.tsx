// app/components/Stories.tsx (Server Component)
import ClientStoriesSlider from "@/components/Client-side-server/StoriesSlider/StoriesSlider";
import fetchData from "@/api/fetchdata";

export default async function Stories() {
  const data = await fetchData("frontend/blogs/");
  const blogs = data.blogs || [];

  return (
    <section className="pt-8 mb-3 px-4 sm:px-6 lg:px-8 bg-white">
      <h1
        className="text-2xl md:text-[48px] text-center font-playfair"
        style={{ color: "#3E3E3E" }}
      >
        READ OUR LATEST STORIES
      </h1>
      <div className="max-w-7xl mx-auto">
        {blogs.length > 0 ? (
          <ClientStoriesSlider blogs={blogs} />
        ) : (
          <p>Loading blogs...</p>
        )}
      </div>
    </section>
  );
}
