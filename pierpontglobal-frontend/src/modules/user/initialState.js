const userInitialState = {
  user: {
    name: '',
    address: '',
    email: '',
    phone: '',
    dealer: {
      name: '',
      latitude: '',
      longitude: '',
      logo: '',
      changingPhoto: false
    },
    photo: '',
    isSavingInfo: false,
  },
  savedCars: [],
  fetchingSavedCars: false
}

export default userInitialState;
