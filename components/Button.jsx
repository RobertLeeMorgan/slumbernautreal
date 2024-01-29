export default function Button({ scroll, title }) {
  return (
    <button onClick={scroll} className='button highlight'>
      {title}
    </button>
  );
}
