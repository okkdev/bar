const refreshFrequency = 5000 // ms

const command = `
BATTERY=$(bash bar/scripts/battery.sh)
TIME=$(date +"%H:%M")
SPOTIFY=$(osascript bar/scripts/spotify.scpt)

echo $(cat <<-EOF
{
  "battery": "$BATTERY",
  "time": "$TIME",
  "spotify": "$SPOTIFY"
}
EOF
)
`

const render = ({ output }) => {
  const data = JSON.parse(output)
  return (
    <div className="w-screen">
      <link href="bar/style.css" type="text/css" rel="stylesheet" />
      <div className="flex justify-between gate">
        <div></div>
        <div className="flex gap-2">
          {data.spotify ? <div className="blob">♫ {data.spotify}</div> : ""}
          <div className="blob">→ {data.time}</div>
          <div className="blob">{data.battery}</div>
        </div>
      </div>
    </div>
  )
}

export { refreshFrequency, command, render }
