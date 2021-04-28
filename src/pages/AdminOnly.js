import React, { useState, useRef } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useHistory } from 'react-router-dom';

function AdminOnly() {
    return (
        <>
            <h1>ADMIN ONLY</h1>
        </>
    )
}

export default AdminOnly;