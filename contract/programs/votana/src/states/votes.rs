
use anchor_lang::prelude::*;

#[account]
pub struct Votes {
    pub total: u64,
    pub active: u64,
}
