import Image from "next/image";

export default function Cards({ record }) {
  return (
    <a href={record.link} target="_blank">
      <div className="card">
        <Image
          loading="lazy"
          src={record.image}
          alt={`${record.title} artwork`}
          style={{
            width: 'auto',
            height: "auto",
            display: 'block'
          }}
          width={118}
          height={118}
        />
        <div className="contents">
          <h5>{record.title}</h5>
          <span className="tag">{record.tag}</span>
        </div>
      </div>
    </a>
  );
}
