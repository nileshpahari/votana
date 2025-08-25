use anchor_lang::prelude::*;

#[account]
pub struct Registrations {
    pub total: u64,
    pub active: u64,
}
