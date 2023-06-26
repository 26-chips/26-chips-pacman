interface LeaderboardFieldProps {
  id: string;
  title: string;
}

export function LeaderboardField({
  title,
}: LeaderboardFieldProps): JSX.Element {
  return <li>{title}</li>;
}
