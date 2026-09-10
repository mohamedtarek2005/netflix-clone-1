import ShowCard from './ShowCard';

export default function ShowGrid({ shows }) {
  return (
    <div className="grid">
      {shows.map((s) => (
        <ShowCard key={s.id} show={s} />
      ))}
    </div>
  );
}
