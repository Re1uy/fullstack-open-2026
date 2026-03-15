const Notification = ({ info }) => {
  return <p className={info.type}>{info.message}</p>
}

export default Notification