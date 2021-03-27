function GoogleMapIframe(props) {
  return (
    <div className="google_map_box">
      <div className="box_content">
        <iframe
          src={props.url}
          width="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default GoogleMapIframe;
