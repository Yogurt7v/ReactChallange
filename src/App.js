function Avatar({ src, name }) {
  return <img src={src} alt={name} />;
}

function Name({ name }) {
  return <h4>{name}</h4>;
}

function Handle({ handle }) {
  return <p>@{handle}</p>;
}

function Badge({ user, style }) {
  return (
    <div style={style}>
      <Avatar src={user.img} name={user.name} />
      <div>
        <Name name={user.name} />
        <Handle handle={user.handle} />
        <button onClick={() => {}}>Add Friend</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Badge
      user={{
        name: 'Lynn Fisher',
        img: 'https://avatars.githubusercontent.com/u/871315',
        handle: 'lynnandtonic',
      }}
      style={{
        width: 300,
        margin: '0 auto',
      }}
    />
  );
}
