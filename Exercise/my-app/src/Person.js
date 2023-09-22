export default function Person({ person }) {
  return (
    <div className="person">
      <img src={person.image} alt={person.name} />
      <p>{person.name}</p>
    </div>
  );
}