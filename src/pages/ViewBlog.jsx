export default function ViewBlog({ blogId, image, title, date }) {
    return (
        <>
            <h1>{title}</h1>
            <img src={image} alt={title} />
            <p>Published on: {date}</p>
        </>
    );
}