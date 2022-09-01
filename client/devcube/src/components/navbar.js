import React from 'react';


function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">

        <a class="navbar-brand" href="#">DebCube</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex" id="navbarSupportedContent">
          <div class="">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
          <div class="">
            <div class="input-group ms-3">
              <input type="text" class="form-control" placeholder="Search" />
              <span class="input-group-text">icon</span>
            </div>
          </div>
          <div class="ms-auto">
            <button type="button" class="btn btn-light">Log in</button>
            <button type="button" class="ms-3 btn btn-outline-primary">Create account</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;