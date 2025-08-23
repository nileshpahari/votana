use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Poll {
    pub id: u64,
    #[max_len(30)]
    pub title: String,
    #[max_len(200)]
    pub description: String,
    pub start: u64,
    pub end: u64,
    pub candidates: u64,
    pub mode: PollMode,
    pub restriction: VoterRestriction,
}

#[derive(AnchorSerialize, AnchorDeserialize, InitSpace, Clone)]
pub enum PollMode {
    Open, // anyone can register as candidate
    Restricted, // only poll creator can register candidates
}

#[derive(AnchorSerialize, AnchorDeserialize, InitSpace, Clone)]
pub enum VoterRestriction {
    Open, // anyone can vote
    Whitelist, // only whitelist can vote
}
