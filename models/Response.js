function Response({data, err}) {
  return {
    data,
    err: err || null
  }
}

module.exports = Response
